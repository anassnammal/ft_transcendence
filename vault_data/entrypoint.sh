#!/bin/sh

set -e

# Start the Vault server in the background
vault server -dev -dev-root-token-id="root" &

# Wait for Vault to be ready
echo "Waiting for Vault to be ready..."
while ! wget -qO- http://127.0.0.1:8200/v1/sys/health; do
  sleep 1
done

# Log in to Vault
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='root'
echo "Logging in to Vault..."
vault login $VAULT_TOKEN

# Enable the transit secrets engine
echo "Enabling transit secrets engine..."
vault secrets enable transit

# Create a transit key for encryption
echo "Creating transit key for encryption..."
vault write -f transit/keys/my-key

# Generate random secrets
echo "Generating random secrets..."
POSTGRES_PASSWORD=$(vault write -field=random_bytes sys/tools/random/32 | base64)
SECRET_KEY=$(vault write -field=random_bytes sys/tools/random/32 | base64)
OAUTH_42_STATE=$(vault write -field=random_bytes sys/tools/random/32 | base64)

# Encrypt sensitive data
echo "Encrypting sensitive data..."
OAUTH_42_CLIENT_ID=$(vault write -field=ciphertext transit/encrypt/my-key plaintext=$(echo -n "$OAUTH_42_CLIENT_ID" | base64))
OAUTH_42_CLIENT_SECRET=$(vault write -field=ciphertext transit/encrypt/my-key plaintext=$(echo -n "$OAUTH_42_CLIENT_SECRET" | base64))

# Write secrets to Vault
echo "Writing secrets to Vault..."
vault kv put secret/trans \
  SERVER_HOST=$SERVER_HOST

vault kv put secret/trans/postgres \
  POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  POSTGRES_USER=postgres \
  POSTGRES_DB=transcendence \
  POSTGRES_HOST=postgres_container \
  POSTGRES_PORT=5432 \
  POSTGRES_NAME=postgres

vault kv put secret/trans/django \
  SECRET_KEY=$SECRET_KEY \
  SERVER_URL=https://${SERVER_HOST}

vault kv put secret/trans/next \
  NEXT_PUBLIC_BACKEND_URL=https://${SERVER_HOST}:443 \
  NEXT_PUBLIC_CHAT_URL=wss://${SERVER_HOST}:443/ws/chat/ \
  NEXT_PUBLIC_INVITATION_URL=wss://${SERVER_HOST}:443/ws/game/invitation/ \
  NEXT_PUBLIC_GAME_URL=wss://${SERVER_HOST}:443/ws/game/game/

vault kv put secret/trans/oauth/42 \
  OAUTH_42_CLIENT_ID=$OAUTH_42_CLIENT_ID \
  OAUTH_42_CLIENT_SECRET=$OAUTH_42_CLIENT_SECRET \
  OAUTH_42_STATE=$OAUTH_42_STATE

# Mark initialization as done
vault kv put secret/trans/init_done initialized=true

echo "Vault initialization and configuration completed successfully."

# Keep the Vault server running in the foreground
wait %1
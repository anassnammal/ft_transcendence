from django.contrib import admin
from .models import Invitation, Game, Tournament

# Register your models here.

from .models import Invitation

admin.site.register(Invitation)
admin.site.register(Game)
admin.site.register(Tournament)
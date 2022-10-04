from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Coords(models.Model):
    lat = models.DecimalField(max_digits=10,decimal_places=9)
    lon = models.DecimalField(max_digits=10,decimal_places=9)
    routeno = models.CharField(null=True,max_length=20)
    

    def __str__(self):
        return f"{self.id} <-- id {self.routeno} <--- routeno"

class Routes(models.Model):
    #route = ArrayField(ArrayField(models.DecimalField(max_digits=20,decimal_places=19),size=2,),size=5000,)

    routeno = models.CharField(null=True,max_length=20)
    route = models.JSONField(null=True)

    def __str__(self):
        return f"{self.routeno} <--- routeno"




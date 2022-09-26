from django.db import models

# Create your models here.

class Coords(models.Model):
    ide = models.IntegerField(null=True)
    lat = models.DecimalField(max_digits=9,decimal_places=8)
    lon = models.DecimalField(max_digits=9,decimal_places=8)
    busno = models.CharField(null=True,max_length=20)

    def __str__(self):
        return f"{self.ide} <-- id {self.lat}:{self.lon}:{self.busno}"



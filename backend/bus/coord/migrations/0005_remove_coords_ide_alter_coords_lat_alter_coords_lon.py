# Generated by Django 4.1.1 on 2022-10-04 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coord', '0004_coords_ide'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coords',
            name='ide',
        ),
        migrations.AlterField(
            model_name='coords',
            name='lat',
            field=models.DecimalField(decimal_places=14, max_digits=14),
        ),
        migrations.AlterField(
            model_name='coords',
            name='lon',
            field=models.DecimalField(decimal_places=14, max_digits=14),
        ),
    ]
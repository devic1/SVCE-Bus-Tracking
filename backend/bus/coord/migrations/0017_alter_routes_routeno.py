# Generated by Django 4.1.1 on 2022-10-09 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coord', '0016_routes_busstops'),
    ]

    operations = [
        migrations.AlterField(
            model_name='routes',
            name='routeno',
            field=models.CharField(max_length=40, null=True),
        ),
    ]

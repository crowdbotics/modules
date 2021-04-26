import json
import subprocess

import django
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate a json with all Models and URLs of the project."

    def handle(self, *args, **options):
        models = django.apps.apps.get_models(
            include_auto_created=True, include_swapped=True
        )
        cmd = "python3 manage.py show_urls --format=json"
        loc = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE)
        print(
            json.dumps(
                {
                    "models": [
                        str(model).split(".")[-1].replace("'", "").strip(">")
                        for model in models
                    ],
                    "urls": json.loads(loc.stdout.decode().strip()),
                }
            )
        )

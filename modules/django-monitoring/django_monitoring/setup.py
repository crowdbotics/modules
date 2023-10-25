import os
from pathlib import Path

from setuptools import setup
from setuptools.command.build import build

try:
    base_dir = Path.cwd()
    settings_file_path = None
    for root, dirs, files in os.walk(base_dir.parent.parent):
        if 'settings.py' in files:
            settings_file_path = f"{root}/settings.py"

    import_statement = "from modules.django_monitoring.monitoring.sentry_configurations import *\n"

    if settings_file_path:
        with open(settings_file_path, 'r') as file:
            lines = file.readlines()
        index_to_insert = lines.index("from modules.manifest import get_modules\n")
        if import_statement not in lines:
            lines.insert(index_to_insert, import_statement)
            with open(settings_file_path, 'w') as file:
                file.write(''.join(lines))
except (Exception,):
    pass


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_django_monitoring",
    version="0.1",
    packages=["monitoring"],
    install_requires=["sentry-sdk[django]"],
    cmdclass={"build": BuildCommand},
)

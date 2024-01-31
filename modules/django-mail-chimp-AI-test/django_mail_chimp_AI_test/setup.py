from setuptools import setup, find_packages
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name='django-mail_chimp_AI_test',
    version='0.1',
    packages=find_packages(),
    install_requires=['mailchimp-marketing', 'celery'],
    python_requires='>=3.8',
)
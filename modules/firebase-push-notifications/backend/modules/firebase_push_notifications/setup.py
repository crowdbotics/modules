from setuptools import setup
from setuptools.command.build import build


# Override build command
class BuildCommand(build):
    def initialize_options(self):
        build.initialize_options(self)
        self.build_base = "/tmp"


setup(
    name="cb_firebase_push_notifications",
    version="0.1",
    packages=[],
    install_requires=["fcm_django ~= 1.0.12", "firebase-admin ~= 5.4.0"],
    cmdclass={"build": BuildCommand},
)

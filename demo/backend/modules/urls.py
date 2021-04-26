from pathlib import Path
from django.conf import settings
from django.urls import path, include


urlpatterns = []


# BE CAREFUL! Do not remove or change this code snippet, this is needed to get
# Crowdbotics' official modules working properly.

try:
    modules_dir = f"{settings.BASE_DIR}/modules/"
    urls = Path(modules_dir).rglob('urls.py')
    for url in urls:
        module_name, _ = url.as_posix().split('/')[-2:]
        if not module_name == "modules":
            urlpatterns += [
                path(f"{module_name}/", include(f"modules.{module_name}.urls"))  # noqa
            ]
except (ImportError, IndexError):
    pass

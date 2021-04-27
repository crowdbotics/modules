Install:

-No additional packages should be required for v1.
-If your app is already up and running, after adding these modules via the npm commands you need to make migrations and run them. In docker: 
	docker-compose exec web python3 manage.py makemigrations
   	docker-compose exec web python3 manage.py migrate

   	You should see something about the 0001 migration running and adding the TermAndCondition model




Usage:
-Go to your admin panel to add a T&C object: site-url.botics.co/admin/modules/termandcondition/
-Add your terms and save. Make sure to set the active flag; without at least 1 T&C object with an active flag, nothing will be returned by the backend. If there are multiple terms objects with active flags, the most recently updated one will be returned.
-Your terms are available at the following url with the given props:
URL: site-url.botics.co/modules/terms/termsandconditions/
Properties:
ID, Body (where your terms are located), author (a numerical ID), is_active, created_at, updated_at





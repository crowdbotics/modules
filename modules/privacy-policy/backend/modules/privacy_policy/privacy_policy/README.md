# Getting Started

## Install:

1. No additional packages should be required for v1. 
2. If your app is already up and running, after adding this modules via the `npm run add` command, you need to make migrations and run them. In docker: 
	```
	docker-compose exec web python3 manage.py makemigrations
   	docker-compose exec web python3 manage.py migrate
	```
   You should see something about the first privacy migration running and adding the PrivacyPolicy model to the db.
3. Set the url the frontend calls. In /privacy-policy/modules/index.js, change the URL in the fetch call, where it says <APP_URL_HERE>, to your app's url.
4. In the admin panel, make sure you add a `PrivacyPolicy` object and set it to active in the admin panel. Then you should should be up and running.


## Usage:
1. Go to your admin panel to add a new `PrivacyPolicy` object: `<site-url>.botics.co/admin/` and click on PrivacyPolicy. Make sure you save it.
2. Make sure to set the active flag. Without at least 1 `PrivacyPolicy` object with an active flag, nothing will be returned by the backend. If there are multiple PP objects with active flags, the most recently updated one will be returned.
3. Your privacy policy will be available at the following endpoint:
GET: `<site-url>.botics.co/modules/privacy-policy/`

Example Response: 
```

{
	ID: 1,
	body: "Privacy Policy ......",
	author: 1,
	is_active: true,
	"created_at": "2021-04-27T18:02:42.491496Z",
	"updated_at": "2021-04-27T18:02:42.491539Z"

}


```

# Getting Started

## Install:

1. No additional packages should be required for v1. 
2. If your app is already up and running, after adding these modules via the npm commands you need to make migrations and run them. In docker: 
	```
	docker-compose exec web python3 manage.py makemigrations
   	docker-compose exec web python3 manage.py migrate
	```
   You should see something about the 0001_terms migration running and adding the TermAndCondition model.
3. Set the url the frontend calls. In /terms-and-conditions/modules/index.js, change the URL in the fetch call, where it says <APP_URL_HERE>, to your app's url.
4. In the admin panel, make sure you add a `TermAndCondition` object and set it to  active in the admin panel. Then you should should be up and running.


## Usage:
1. Go to your admin panel to add a new `TermAndCondition` object: `<site-url>.botics.co/admin/modules/termandcondition/`. Make sure you save it.
2. Make sure to set the active flag; without at least 1 `TermAndCondition` object with an active flag, nothing will be returned by the backend. If there are multiple terms objects with active flags, the most recently updated one will be returned.
3. Your terms will be available at the following endpoint:
GET: `<site-url>.botics.co/modules/terms-and-conditions/`
Example Response: 
```

{
	ID: 1,
	body: "TERMS AND CONDITIONS SAMPLE AGREEMENT...",
	author: 1,
	is_active: true,
	"created_at": "2021-04-27T18:02:42.491496Z",
	"updated_at": "2021-04-27T18:02:42.491539Z"

}


```

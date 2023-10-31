# Front Dynamic Object on Vercel Node

Simple implementation of a [Front Dynamic Objects](https://help.front.com/en/articles/2002) handler, built to deploy to a Vercel Node.JS runtime as a serverless function.

## How to Deploy

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=front.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/frontapp/front-application-examples/tree/main/dynamic-objects/vercel-node&project-name=front-dynamic-object&repository-name=front-dynamic-object)

### Clone and Deploy

```bash
git clone https://github.com/frontapp/front-application-examples/tree/main/dynamic-objects/vercel-node.git
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```

You can deploy either via pushing the code to Github, or by running:

```bash
vercel deploy
```

## After Deploying - Connecting to a Front Dynamic Object

### 1. Configure your Front Dynamic Object

If you have not done so already, head into your [Front Developer Settings](https://app.frontapp.com/settings/developers) and create a new Application. Copy the **App Secret** from your application for use in the step below.

### 2. Set required environment variables in Vercel

You'll need to ensure you configure the `FRONT_APP_SECRET` environment variable in your repo. You can do this via the Vercel UI, or by running:

```bash
vercel env add FRONT_APP_SECRET production
```

### 3. Create and configure your Dynamic Object in Front

Back in Front, Click into your app, and select the Servers tab. Create a new Server using the URL of your vercel deployment.

Click into the Features tab, and create a new Dynamic Object. Start by creating a text pattern to match. For example, if you want to match order IDs and they all look like "#12345" you could enter "#" followed by the {DIGITS} option.

Create a new Dynamic Variable. Use the **Fetch from Server** option and enter the URL of your Vercel deployment, followed by `/api/dynamic-object?id=`, and end with the variable from your text pattern. As a next step in the variable, select Parse as JSON, and hit Save.
This will have Front send API requests to your hosted app including the ID identified in the matched string.

Now we need to extract fields from the API response for use in our Dynamic Object. Create a new Dynamic variable, and start by using the result of a previous variable - your JSON API request. Add a step to **Extract object property**, and enter the name of the property to extract. For this example, let's use `title`. Add a step to Parse as String, and Save.

Now we can use this title fetched from our app in our Dynamic Object. Try setting the **Title** field to the value of your new title dynamic variable. Enter some text in the test field, such as "#123", hit Test, and see the result returned via our application.

## Further development

Now you have a basic app working, having Front issue a secure API call to an application hosted on Vercel, and the app returns some data as a JSON object.

You should look at replacing the example data fetch in `/api/dynamic-object.ts` with a real API call to fetch your own data; this might be from an API you own, or by connecting to your database.

## Need help?

Raise an issue in GitHub, ask in [Front's developer forum](https://community.front.com/developer-q-a-37) or reach out to [Front's Support team](https://help.front.com/en/contact-us) with questions.

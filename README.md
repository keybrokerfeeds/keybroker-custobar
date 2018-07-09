# A service for exporting dashboard data from Custobar

### Features
* Class :wrench: that collects all the dashboard :chart_with_upwards_trend: data and returns it in a json format
* Logs in with your credentials and sets a session cookie to allow you to fetch protected :key: URLs :link:
* Send output as mail :email: to set up as cron tab :clock2: and/or Serverless :zap:

### How to use

#### Use it in your terminal
Run the script
```
npm start
```

#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
CUSTOBAR_RECEIVER|Email adress the export mail will be sent to|For mail|N/A
CUSTOBAR_RECEIVER_CC|cc email adress|For mail|N/A
POSTMARK_API_KEY|API token for Postmark App account|For mail|N/A

### How to build
Clone the GitHub repo
```
git clone https://github.com/keybrokerfeeds/keybroker-custobar.git
```

Change current directory
```
cd keybroker-custobar
```

Install dependencies
```
npm install
```

Enter your credentials
```
mv credentials_template.json credentials.json
pico config/credentials.json
```

### Deploy to AWS Lambda with Serverless
Create an AWS account

Install Serverless and follow the instructions to set up your AWS credentials
```
npm install -g serverless
```

Update environment variables in the Serverless configuration file
```
mv serverless_template.yml serverless.yml
pico serverless.yml
```

Deploy service
```
sls deploy
```

Test your export service
```
sls invoke -f exportCustobarDataByMail -l
```

# To do
* Generalise to fetch URLs from any password protected site

# Provided As-Is :warning:

Keybroker is not affiliated with Custobar. Custobar may change their endpoints and data structures at any time. Keybroker does not take any responsibility for the correctness, format or quality of the returned data from this package. It is provided as-is.

# About [Keybroker](https://keybroker.se)
Keybroker ensures that people always finds your products and services. Keybroker are specialists at optimising your digital customer acquisition channels (SEO, SEM, Social, Programmatic, YouTube, Email) and converting customer and market insights to triggers enabling your growth today. We are your digital growth engine :rocket:

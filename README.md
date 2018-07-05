# A service for exporting dashboard data from Custobar

### Features
* Class :wrench: that collects all the dashboard :chart_with_upwards_trend: data and returns it in a json format
* Example implemention in `index.js` that prints a csv table :scroll:

### How to use

#### Use it in your terminal
Run the script
```
npm start
```

#### Available environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
None|at|the|moment

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

# Provided As-Is :warning:

Keybroker is not affiliated with Custobar. Custobar may change their endpoints and data structures at any time. Keybroker does not take any responsibility for the correctness, format or quality of the returned data from this package. It is provided as-is.

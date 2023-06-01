import requests

# url = 'https://fqvysvv7b4.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data';
# username = 'rommelnuque'
# filename = 'test.csv'

url = 'https://5u8lxhfkbj.execute-api.ca-central-1.amazonaws.com/download-era5-gars-data';
username = 'ericknuque'
filename = 'test_ericknuque_20230601000000.csv'
content = 'abc'

params = {
    'username': username,
    'filename': filename,
    'content': content
}

response = requests.get(url, params=params)

if response.status_code == 200:
    # Successful response
    data = response.json()
    print(data)
else:
    # Error occurred
    print(f"Error: {response.status_code} - {response.text}")

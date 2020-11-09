# shiori-rss-importer

some script importing rss feed to shiori via system call

## Prologue

`npm install`

## Usage

1. change filename of rss xml file in import script
2. change path to point to shiori binary in import script
3. update shiori after import by calling `shiori update`

## Epilogue

All imported feeds are assigned to the shiori user account (id 0, basically the admin account).
In order to change ownership you will have to update the database afterwards manually.


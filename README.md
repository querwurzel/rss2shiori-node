# shiori-rss-importer

some script importing rss feed to shiori via system call

## Usage

1. change filename of rss xml file in script
2. change system call to point to shiori binary by absolute path
3. update shiori after import by calling `shiori update`

## Epilogue

All imported feeds are assigned to the shiori user account (id 0, basically the admin account).
In order to change ownership you will have to update the database afterwards manually.


# pages

## layout (all pages other than api)

not logged in:

- login
- register

logged in:

- logout
- admin (logged in as admin)

## index

- new

## register

- redirects to index if logged in
- redirects to index after registration

## login

- redirects to index if logged in
- redirects to previous page after login

## new

- redirects to login if not logged in
- redirects to index after sending entry

## admin

- redirects to login if not logged in

## api

- json of current scrore

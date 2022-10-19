# Data models

## Accounts microservice

---

### Accounts

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | string | yes    | no       |
| username         | string | yes    | no       |
| full_name        | string | no     | no       |
| email            | string | no     | no       |
| hashed_pass      | string | yes    | no       |
| buying_power     | int    | no     | no       |




## Trading microservice

---

### Accounts(VO)

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| id               | string | yes    | no       |
| username         | string | yes    | no       |



### Transactions

| name             | type                         | unique | optional |
| ---------------- | -----------------------------| ------ | -------- |
| id               | string                       | yes    | no       |
| username         | reference to Accounts entity | yes    | no       |
| symbol           | string                       | no     | no       |
| type_of          | string                       | no     | no       |
| time_of_purchase | string                       | no     | no       |
| quantity         | int                          | no     | no       |
| price            | int                          | no     | no       |



### Positions

| name             | type                         | unique | optional |
| ---------------- | -----------------------------| ------ | -------- |
| symbol           | string                       | yes    | no       |
| id               | string                       | yes    | no       |
| username         | reference to Accounts entity | yes    | no       |
| name             | sring                        | no     | no       |
| quantity         | int                          | no     | no       |
| type_of          | string                       | no     | no       |


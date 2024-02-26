# resource_pressurizer
A project that has code that is intended the pressure CPU and Network IO on the machine on which it is running

## Installation

From the root of the project directory execute the following command in a terminal window:

`npm install`

## Running the application

`npm start`

## Terminating the application

`ctrl+c`

## Environment Variables

`SERVER_PORT`, The port on which the server is listening. The default is `8080`.

`OMIT_CPU`, Indicates that the CPU pressurizer should be omitted from the run. Default is `false`.

`OMIT_NETWORK`, Indicates that the Network pressurizer should be omitted from the run. Default is `false`.

This project supports using a `.env` file to declare, store and publish environmental variable settings.

Add the environment variables to the `.env` file that is stored at the root of the project directory to alter the default behavior of the application.

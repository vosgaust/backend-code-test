### Launching with docker compose
Just install docker along with docker-compose and run:

```
docker-compose up
```

It will start a mongodb instance and the application itsef. If you want to make changes to the app and run them, you need to execute this line before the above:

```
docker-compose build
```

To shut all the services down you need to run this:

```
docker-compose down -v
```

### Solution
I have tagged the different solutions in case it's ease to review them. You will find the tags `stage-1`, `stage-2` and `stage-3`.

### Decisions taken
* In order not to change the InMemory implementation I decided to leave the interface untouched. I would have change the interface for find and delete methods to receive the value-object GeniallyID instead of the string primitive.
* I assumed that the API consumer would generate a send an uuid instead of generating it in the backend
* As the repository interface does not provide an update method I have had to delete and then save again. This would be prone to race conditions in a real scenario but I have decided to leave transactions outside of the test.

### Areas to improve
* Improve error handling. Specially errors received from MongoDB
* Add logging
* Acceptance tests
* Avoid race conditions for updating and deleting. Either by adding an update method or by using transactions
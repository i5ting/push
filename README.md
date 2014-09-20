# Push

## hadoop-docker

https://registry.hub.docker.com/u/sequenceiq/hadoop-docker/


### Start a container

In order to use the Docker image you have just build or pulled use:

	docker run -i -t sequenceiq/hadoop-docker:2.5.1 /etc/bootstrap.sh -bash
	
### hadoop config here

https://github.com/sequenceiq/hadoop-docker



### Testing

You can run one of the stock examples:

	cd $HADOOP_PREFIX
	# run the mapreduce
	bin/hadoop jar share/hadoop/mapreduce/hadoop-mapreduce-examples-2.5.1.jar grep input output 'dfs[a-z.]+'

	# check the output
	bin/hdfs dfs -cat output/*
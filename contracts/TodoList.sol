// SPDX-License-Identifier: unlicensed
pragma solidity ^0.5.0;

contract TodoList {
	uint256 taskCount = 0;

	struct Task {
		uint256 id;
		string content;
		bool completed;
	}

	mapping(uint256 => Task) public tasks;

	constructor() public {
		createTask("test");
	}

	function createTask(string memory newTask) public {
		tasks[taskCount] = Task(taskCount, newTask, false);
		taskCount++;
	}

	function getAllTasksIndex() public view returns (uint256) {
		return taskCount;
	}

	function getTaskAtIndex(uint256 index)
		public
		view
		returns (
			uint256,
			string memory,
			bool
		)
	{
		Task memory tempTask = tasks[index];
		return (tempTask.id, tempTask.content, tempTask.completed);
	}
}

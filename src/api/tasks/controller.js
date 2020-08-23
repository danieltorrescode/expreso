const Task = require('./model');

const taskCtrl = {};

taskCtrl.getTasks = async (req, res, next) => {
    const tasks = await Task.find();
    res.json(tasks);
};

taskCtrl.createTask = async (req, res, next) => {
    let task = new Task({
        name: req.body.name,
        description: req.body.description,
    });
    task = await task.save();
    res.json({text: 'Task created',task:task});
};

taskCtrl.getTask = async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);
};

taskCtrl.editTask = async (req, res, next) => {
    const { id } = req.params;
    let task = {
        name: req.body.name,
        description: req.body.description,
    };
    task = await Task.findByIdAndUpdate(id, {$set: task}, {new: true});
    res.json({text: 'Task Updated',task:task});
};

taskCtrl.deleteTask = async (req, res, next) => {
    let task = await Task.findByIdAndRemove(req.params.id);
    res.json({text: 'Task Deleted', task:task});
};

module.exports = taskCtrl;


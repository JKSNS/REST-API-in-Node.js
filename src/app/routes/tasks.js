const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`);
    else res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});










router.get(`/`, async (req, res) => { // GETS ALL THE TASKS
  try {
      const tasks = await Task.find({UserId: req.user.Id})
      if (!tasks) res.status(404).send(`No tasks found.`)
      else {
      res.status(200).send(tasks)
      return }
  
  } catch (error) {
      console.error(error)
      res.status(500).send(`There was a problem getting all the tasks.`)
      return
  }
})

router.get(`/:id`, async (req, res) => { // GETTING ONE TASK BY ID
  try {
      const task = await Task.findById(req.params.id)
      if (!task) res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
      else res.status(200).send(task)
  } catch (error) {
      console.error(error)
      res.status(500).send(`Something went wrong.`)
      return
  }
})

router.put(`/:id`, async (req, res) => { // UPDATING A TASK
  try {
      const task = await Task.findById(req.params.id)
      if (!task) {
          res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
          return }
      else {
      let newDone = !task.Done
      await Task.findByIdAndUpdate(req.params.id, {Done: newDone});
      const task2 = await Task.findById(req.params.id)
      res.status(200).send(task2)
      return }
      
  } catch (error) {
      console.error(error)
      res.status(500).send(`Something went wrong.`)
      return
  }
})


router.post(`/`, async (req, res) => { // CREATING SOMETHING
  try {
      // CHECK TO MAKE SURE IT THROWS AN ERROR FOR NO TEXT OR DATE
      if (!req.body.Text || !req.body.Date) res.status(500).send(`Text and date is required.`)
      else {
          const task = await new Task({UserId: req.user.Id, Text: req.body.Text, Done: false, Date: req.body.Date})
          if (!task) {
              res.status(404).send(`Failed to create task`)
              return }
          else {
              await task.save()
              res.status(201).send(task)
              return
          }
      }
      
  
      
  } catch (error) {
      console.error(error)
      res.status(500).send(`Something went wrong.`)
  }
})



router.delete(`/:id`, async (req, res) => { // DELETING SOMETHING
  try {
      if (req.params.id == null) {
          res.status(500).send(`ID null.`)
          return
          
      }
      let task = await Task.findById(req.params.id)
      if (!task) {
          res.status(404).send(`Task with ID ${req.params.id} does not exist.`)
          return }
      else {
          let deleteTask = await Task.findByIdAndDelete(req.params.id)
          if (!deleteTask) res.status(404).send(`Task doesn't exist`)
          else {
          res.status(201).send()
          return }
      }
  
  } catch (error) {
      console.error(error)
      res.status(500).send(`Something went wrong.`)
  }
})


module.exports = router;

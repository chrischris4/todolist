const Task = require('../models/task');
const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;

exports.createTask = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      status,
      priority,
      endTime,
      userId,
      userConcerned,
    } = req.body;

    let userConcernedArray;

    if (userConcerned === 'none') {
      userConcernedArray = undefined;
    } else if (Array.isArray(userConcerned) && userConcerned.length > 0) {
      userConcernedArray = userConcerned.filter(
        (user) => user && isValidObjectId(user)
      );
    } else {
      userConcernedArray = undefined;
    }

    const newTask = new Task({
      name,
      description,
      category,
      status,
      priority,
      endTime,
      userId,
      userConcerned: userConcernedArray,
      creationTime: new Date(),
      updateTime: new Date(),
    });

    await newTask.save();

    res.status(201).json({
      message: 'Task créé avec succès',
      event: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(200).json({
      message: 'Liste des tâches récupérée avec succès',
      tasks: tasks,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Utilisez "id" ici
    const task = await Task.findById(id).populate(
      'userConcerned',
      'firstName lastName'
    );

    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Erreur serveur lors de la récupération de la tâche' });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { name, description, category, userConcerned } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'ID de tâche invalide' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          ...(name && { name }),
          ...(description && { description }),
          ...(category && { category }),
          ...(userConcerned && { userConcerned }),
          updateTime: new Date(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    res.status(200).json({
      message: 'Tâche mise à jour avec succès',
      task: updatedTask,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res
      .status(500)
      .json({ error: 'Erreur serveur lors de la mise à jour de la tâche' });
  }
};

// exports.deleteOneTask = async (req, res) => {
//   const taskId = req.params.id;

//   try {
//     const result = await Task.findByIdAndDelete(taskId);

//     if (result) {
//       return res.status(200).json({ message: 'Task supprimé avec succès' });
//     } else {
//       return res.status(404).json({ message: 'Task non trouvé' });
//     }
//   } catch (error) {
//     console.error('Erreur lors de la suppression de la task:', error);
//     return res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

const checkTask = async () => {
  try {
    const tasks = await Task.find({});
    console.log(tasks);
  } catch (error) {
    console.error('Erreur lors de la vérification des events', error);
  }
};
checkTask();

// (async () => {
//   try {
//     // Supprimez tous les task existants
//     await Task.deleteMany({});
//     console.log('Toutes les task existantes ont été supprimés.');
//   } catch (error) {
//     console.error(
//       'Erreur lors de la suppression des tasks au démarrage:',
//       error
//     );
//   }
// })();

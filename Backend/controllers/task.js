const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const { name, description, category, status, priority, endTime } = req.body;

    const newTask = new Task({
      name,
      description,
      category,
      status,
      priority,
      endTime,
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

// exports.deleteTask = async (req, res) => {
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
//     try {
//         // Supprimez tous les task existants
//         await Task.deleteMany({});
//         console.log('Toutes les task existantes ont été supprimés.');
//     } catch (error) {
//         console.error(
//             'Erreur lors de la suppression des tasks au démarrage:',
//             error
//         );
//     }
// })();

import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/Department.js";
import Onboarding from '../models/Onboarding.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "user already registered in emp" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();
    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
      if(!employee) {
        employee = await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
      }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }
    const user = await User.findById({_id: employee.userId})

    if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "user not found" });
      }

      const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
      const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
        maritalStatus,
        designation, salary, department
      })

      if(!updateEmployee || !updateUser) {
        return res
          .status(404)
          .json({ success: false, error: "document not found" });
      }

      return res.status(200).json({success: true, message: "employee update"})

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employees server error" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id })
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employeesbyDepId server error" });
  }
}

const getEmployeeTasks = async (req, res) => {
  const employeeId = req.user.employeeId; // Get employeeId from the authenticated user (assumed to be attached via middleware)
  try {
    const employee = await Employee.findById(employeeId).populate('onboardingTasks.taskId');
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }
    return res.status(200).json({ success: true, tasks: employee.onboardingTasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const assignOnboardingTask = async (req, res) => {
  const { employeeId, taskId } = req.body; // taskId is from the Onboarding collection
  try {
    // Find the employee by ID
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the onboarding task by taskId
    const task = await Onboarding.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: "Onboarding task not found" });
    }

    // Add task to employee's onboardingTasks array
    employee.onboardingTasks.push({ taskId: task._id, taskName: task.taskName, dueDate: task.dueDate });
    await employee.save();

    return res.status(200).json({ success: true, message: "Task assigned successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error in assigning task" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId, getEmployeeTasks, assignOnboardingTask, deleteEmployee };

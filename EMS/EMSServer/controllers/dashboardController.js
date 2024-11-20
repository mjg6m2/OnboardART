import Department from "../models/Department.js";
import Employee from "../models/Employee.js"

const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        const totalDepartments = await Department.countDocuments();

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
        })
    }catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "dashboard summary error"})
    }
}

export {getSummary}
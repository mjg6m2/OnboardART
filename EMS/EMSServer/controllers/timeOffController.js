import TimeOff from '../models/TimeOff.js'
import Employee from '../models/Employee.js'

const reqTimeOff = async (req, res) => {
    try {
        const {userID, requestType, startDate, endDate, reason} = req.body
        const employee = await EmployeeDashboard.findOne({userID})

        const newTimeOff = new TimeOff({
            employeeID: employee._id, 
            requestType, 
            startDate, 
            endDate, 
            reason
        })

        await newTimeOff.save()

        return res.status(200).json({success: true})
    
    } catch(error) {
        return res.status(500).json({success: false, error: "time off add server error"})
    }

}

export {reqTimeOff}
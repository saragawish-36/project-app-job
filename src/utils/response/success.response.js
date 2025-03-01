export const successRequest =({res,status=200,message="done",data={}})=>{
    return res.status(status).json({message,data})
    }
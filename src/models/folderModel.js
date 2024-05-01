import mongoose from "mongoose";


const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nom d'utilisateur requis"],
    },
    user_id: {
        type: String,
        required: true,
    },
    parent_folder_id: {
        type: String,
        required: false,
    },
    creation_date: {
       type: String,
    }
})

const Folder = mongoose.models.folders || mongoose.model("folders", folderSchema);

export default Folder;
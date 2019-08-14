import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: true, required: true },
    username: { type: String, unique: true, lowercase: true, required: true },
    firstname: { type: String, lowercase: true, required: true },
    lastname: { type: String, lowercase: true, required: true },
    category: { type: String, required: true, enum: ['illustration', 'photography', 'watcher'] },
    birthday: { type: Date, required: true },
    signup_date: { type: Date, default: Date.now() },
    experience: Number,
    header_file_name: String,
    avatar_file_name: String,
    status_text: String,
    visits_number: Number,
    victories_number: Number,
    defeats_number: Number,
    link_to_facebook: String,
    link_to_twitter: String,
    link_to_deviantart: String,
    facebook_toggle: Boolean,
    twitter_toggle: Boolean,
    deviantart_toggle: Boolean,
    is_active: Boolean,
    role: { type: String, required: true, enum: ['superadmin', 'admin', 'user'] },
})

export default mongoose.model('User', UserSchema)
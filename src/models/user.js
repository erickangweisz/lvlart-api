const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, select: true, required: true },
    username: { type: String, unique: true, lowercase: true, required: true },
    fullname: { type: String, lowercase: true, required: true },
    category: { type: String, required: true, enum: ['illustration', 'photography', 'watcher'] },
    birthday: { type: Date, required: true },
    signup_date: { type: Date, default: Date.now() },
    experience: { type: Number, default: 0 },
    header_file_name: { type: String, default: null },
    avatar_file_name: { type: String, default: null },
    status_text: { type: String, default: null },
    visits_number: { type: Number, default: 0 },
    victories_number: { type: Number, default: 0 },
    defeats_number: { type: Number, default: 0 },
    link_to_facebook: { type: String, default: null },
    link_to_twitter: { type: String, default: null },
    link_to_deviantart: { type: String, default: null },
    facebook_toggle: { type: Boolean, default: true },
    twitter_toggle: { type: Boolean, default: true },
    deviantart_toggle: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
    role: { type: String, required: true, enum: ['superadmin', 'admin', 'user'] },
})

module.exports = mongoose.model('User', UserSchema)
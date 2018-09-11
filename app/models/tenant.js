'use strict';

const uuid         = require('uuid');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const TenantSchema   = new Schema({
	id: { type: String, default: uuid },
    name: {type: String, default: null},
    email: {type: String, default: null},
    phone: {type: Number, default: null},
    address: {type: String, default: null},
    debt: {type: Number, default: 0}
});

const Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;
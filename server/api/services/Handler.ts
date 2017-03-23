import * as mongoose from 'mongoose';

export default class Handler {
    constructor(schemaModel) {
        this.model = schemaModel;
    }

    private model;

    create(data) {
        console.log(data);
        const newEntity = new this.model(data);

        newEntity.save();
    }
}
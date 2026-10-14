package repository

import (
	model "github.com/Sharkweb-IT-Park/sharkweb-mvp-base/backend/modules/notification/model"
)

type Repository struct {
	db []model.Notification
}

func NewRepository() *Repository {
	return &Repository{
		db: make([]model.Notification, 0),
	}
}

func (r *Repository) FindAll() []model.Notification {
	return r.db
}

func (r *Repository) Save(entity model.Notification) model.Notification {
	r.db = append(r.db, entity)
	return entity
}

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171204172752) do

  create_table "categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.string   "image"
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "discounts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "product_id",                              null: false
    t.string   "name"
    t.date     "date"
    t.float    "percent",     limit: 24,    default: 0.0
    t.text     "description", limit: 65535
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["product_id"], name: "index_discounts_on_product_id", using: :btree
  end

  create_table "location_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "location_type_id", null: false
    t.integer  "position_id",      null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["location_type_id"], name: "index_locations_on_location_type_id", using: :btree
    t.index ["position_id"], name: "index_locations_on_position_id", using: :btree
  end

  create_table "oauth_access_grants", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "resource_owner_id",               null: false
    t.integer  "application_id",                  null: false
    t.string   "token",                           null: false
    t.integer  "expires_in",                      null: false
    t.text     "redirect_uri",      limit: 65535, null: false
    t.datetime "created_at",                      null: false
    t.datetime "revoked_at"
    t.string   "scopes"
    t.index ["application_id"], name: "fk_rails_b4b53e07b8", using: :btree
    t.index ["token"], name: "index_oauth_access_grants_on_token", unique: true, using: :btree
  end

  create_table "oauth_access_tokens", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "resource_owner_id"
    t.integer  "application_id"
    t.string   "token",                               null: false
    t.string   "refresh_token"
    t.integer  "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at",                          null: false
    t.string   "scopes"
    t.string   "previous_refresh_token", default: "", null: false
    t.index ["application_id"], name: "fk_rails_732cb83ab7", using: :btree
    t.index ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, using: :btree
    t.index ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", using: :btree
    t.index ["token"], name: "index_oauth_access_tokens_on_token", unique: true, using: :btree
  end

  create_table "oauth_applications", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                                    null: false
    t.string   "uid",                                     null: false
    t.string   "secret",                                  null: false
    t.text     "redirect_uri", limit: 65535,              null: false
    t.string   "scopes",                     default: "", null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.index ["uid"], name: "index_oauth_applications_on_uid", unique: true, using: :btree
  end

  create_table "orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "table_id",                            null: false
    t.integer  "state",                 default: 0
    t.float    "total",      limit: 24, default: 0.0
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["table_id"], name: "index_orders_on_table_id", using: :btree
  end

  create_table "positions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "product_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "product_id",             null: false
    t.integer  "order_id",               null: false
    t.integer  "quantity",   default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["order_id"], name: "index_product_orders_on_order_id", using: :btree
    t.index ["product_id"], name: "index_product_orders_on_product_id", using: :btree
  end

  create_table "products", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.string   "image"
    t.integer  "quantity",                  default: 0
    t.text     "description", limit: 65535
    t.integer  "state",                     default: 0
    t.integer  "unit_id",                               null: false
    t.integer  "category_id",                           null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["category_id"], name: "index_products_on_category_id", using: :btree
    t.index ["unit_id"], name: "index_products_on_unit_id", using: :btree
  end

  create_table "roles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "shifts", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.time     "time_in"
    t.time     "time_out"
    t.date     "date"
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_shifts_on_user_id", using: :btree
  end

  create_table "tables", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.integer  "image"
    t.text     "description", limit: 65535
    t.integer  "state",                     default: 0
    t.integer  "position_id",                           null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.index ["position_id"], name: "index_tables_on_position_id", using: :btree
  end

  create_table "units", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.text     "description", limit: 65535
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email",                                default: "", null: false
    t.string   "name"
    t.text     "address",                limit: 65535
    t.integer  "gender",                               default: 0
    t.date     "birthday"
    t.integer  "state",                                default: 0
    t.integer  "role_id",                                           null: false
    t.string   "encrypted_password",                   default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

  add_foreign_key "discounts", "products"
  add_foreign_key "locations", "location_types"
  add_foreign_key "locations", "positions"
  add_foreign_key "oauth_access_grants", "oauth_applications", column: "application_id"
  add_foreign_key "oauth_access_tokens", "oauth_applications", column: "application_id"
  add_foreign_key "orders", "tables"
  add_foreign_key "product_orders", "orders"
  add_foreign_key "product_orders", "products"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "units"
  add_foreign_key "shifts", "users"
  add_foreign_key "tables", "positions"
  add_foreign_key "users", "roles"
end

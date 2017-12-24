# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Tạo ra các quyền mặc định
admin = Role.create(code: "admin", name: "Quản Lý", description: "Bạn có thể tạo ra những người dùng phù hợp với mục đích của mình")
cashier = Role.create(code: "cashier", name: "Thu Ngân", description: "Quản lý thu ngân")
staff = Role.create(code: "staff", name: "Nhân viên", description: "Gọi món bằng thiết bị smartphone")

# Tạo admin mặc định
is_admin = User.create(email: "admin001@gmail.com", name: "Ngo Van Tien",
  password: "12345678", password_confirmation: "12345678",
  birthday: "09/2/1993", gender: "male", address: "đà nẵng", role_id: "1")


# Tạo category drink default
cafe = Category.create(name: "Cafe", description: "Các thức uống chứa cafein")
drink = Category.create(name: "Nước giải khát", description: "Các loại nước giải khát")
tea = Category.create(name: "Trà", description: "Các loại trà nóng lạnh")

# Các loại đơn vì
glass = Unit.create(name: "Ly", description: "Đơn vị là ly")
gasper = Unit.create(name: "Điêú", description: "Đơi vị là điếu")
bottle = Unit.create(name: "Chai", description: "Đơn vị là chai")

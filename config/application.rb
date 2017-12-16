require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module InsalEverest
  class Application < Rails::Application
    config.i18n.load_path += Dir["#{Rails.root.to_s}/config/locales/**/*.{rb,yml}"]
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.i18n.default_locale = :vn
  end
end

# encoding: utf-8

class ImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  # include CarrierWave::MiniMagick

  # Choose what kind of storage to use for this uploader:
  storage :file
  # storage :fog

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    ActionController::Base.helpers.asset_path([version_name, image_model_default(model.class.name)]
      .compact.join("_"))
  end

  def image_model_default model
    case model
    when Table.name
      "default.png"
    when Product.name
      "default.png"
    when Position.name
      "default.png"
    when Category.name
      "default.png"
    else
      "default.png"
    end
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end

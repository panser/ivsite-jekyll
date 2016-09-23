# bundle exec dato dump --token=d28e9f0f1bcdd5e1dee5b6f2d78bce375e162b9a0466def110

dato.available_locales.each do |locale|
  directory "content/#{locale}" do
    I18n.with_locale(locale) do
      create_data_file "site.yml", :yaml, dato.site.to_hash
      dato.item_types.each do |item_type|
        create_data_file "#{item_type.api_key}.yml", :yaml,
                         dato.items_of_type(item_type).map(&:to_hash)
      end
    end
  end
end

directory "_news" do
  dato.news.each_with_index do |element, i|
    create_post "#{element.slug}.md" do
      frontmatter :yaml,
                  layout: 'post',
                  title: element.title,
                  date: element.updated_at.to_s,
                  category: 'news'
      content element.description
    end
  end
end


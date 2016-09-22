# bundle exec dato dump --token=d28e9f0f1bcdd5e1dee5b6f2d78bce375e162b9a0466def110

directory "_news" do
  dato.news.each_with_index do |element, i|
    create_post "#{element.slug}.md" do
      frontmatter :yaml,
                  layout: 'post',
                  title: element.title,
                  categories: 'news'
      content element.description
    end
  end
end

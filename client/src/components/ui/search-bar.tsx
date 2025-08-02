import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/../../shared/schema';

interface SearchBarProps {
  blogPosts: BlogPost[];
  onSearch: (query: string) => void;
  onSelectPost: (slug: string) => void;
}

export function SearchBar({ blogPosts, onSearch, onSelectPost }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = blogPosts
        .filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, blogPosts]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (slug: string) => {
    setShowSuggestions(false);
    onSelectPost(slug);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 1 && setShowSuggestions(suggestions.length > 0)}
            className="pl-10 pr-10 py-3 text-lg bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((post) => (
            <button
              key={post.id}
              onClick={() => handleSelectSuggestion(post.slug)}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-600 last:border-b-0 transition-colors"
            >
              <div className="flex items-start gap-3">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
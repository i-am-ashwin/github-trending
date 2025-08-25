import { programmingLanguages } from "@/lib/languages";
import { Select } from "radix-ui";
import { ChevronDown, Check } from 'lucide-react';
interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageSelection({ selectedLanguage, onLanguageChange }: LanguageSelectionProps) {
  return (
        <Select.Root value={selectedLanguage} onValueChange={onLanguageChange}>
          <Select.Trigger
            className="inline-flex h-[48px] w-[160px] items-center justify-between gap-2 bg-orange-300 px-4 py-2 text-sm font-bold text-black border-4 border-black shadow-[4px 4px 0px 0px rgba(0,0,0,1)] outline-none hover:bg-orange-400 hover:shadow-[6px 6px 0px 0px rgba(0,0,0,1)] focus:shadow-[6px 6px 0px 0px rgba(0,0,0,1)] transition-all duration-200"
            aria-label="Filter by language"
          >
            <Select.Value placeholder="Languages" />
            <Select.Icon className="text-black">
              <ChevronDown />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white border-4 border-black shadow-[8px 8px 0px 0px rgba(0,0,0,1)] max-h-[300px]">
              <Select.Viewport className="p-2">
                <Select.Group>
                  {programmingLanguages.map((language) => (
                    <Select.Item
                      key={language}
                      value={language}
                      className="relative flex h-[32px] select-none items-center pl-6 pr-8 text-sm font-bold text-black outline-none cursor-pointer hover:bg-orange-300 focus:bg-orange-300 border-2 border-transparent hover:border-black focus:border-black mb-1"
                    >
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <Check className="w-4 h-4 font-bold" />
                      </Select.ItemIndicator>
                      <Select.ItemText>{language}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
  );
}

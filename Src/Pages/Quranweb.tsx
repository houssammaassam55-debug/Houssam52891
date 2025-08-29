import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Verse {
  number: number;
  text: string;
  numberInSurah: number;
}

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: Verse[];
}

const QuranWeb: React.FC = () => {
  const [quranData, setQuranData] = useState<any | null>(null);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuranData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const data = await response.json();
        setQuranData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuranData();
  }, []);

  const handleSurahSelect = (surah: Surah) => setSelectedSurah(surah);
  const handleBackToList = () => setSelectedSurah(null);

  if (loading) {
    return (
      <div style={{minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <Loader2 className="w-8 h-8 animate-spin" />
        <p style={{marginTop: 12}}>Loading the Holy Quran...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', color:'red'}}>
        {error}
      </div>
    );
  }

  return (
    <div style={{padding: 16, paddingBottom: 80}}>
      {!selectedSurah ? (
        <Card>
          <div style={{padding: 16}}>
            <h2 style={{textAlign:'center', marginBottom: 16}}>
              The Holy Quran - {quranData?.data.surahs.length} Surahs
            </h2>
            <ScrollArea style={{maxHeight: '60vh'}}>
              <div>
                {quranData?.data.surahs.map((surah: Surah) => (
                  <Button
                    key={surah.number}
                    onClick={() => handleSurahSelect(surah)}
                    style={{display:'block', width:'100%', textAlign:'right', marginBottom:8}}
                  >
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div style={{textAlign:'right'}}>
                        <div style={{fontWeight:'bold'}}>{surah.name}</div>
                        <div style={{fontSize:12, opacity:.7}}>
                          {surah.englishName} - {surah.numberOfAyahs} verses
                        </div>
                      </div>
                      <div style={{background:'#16a34a', color:'#fff', borderRadius:9999, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12}}>
                        {surah.number}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      ) : (
        <Card>
          <div style={{padding: 16}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16}}>
              <Button variant="outline" onClick={handleBackToList}>← Back to List</Button>
              <div style={{textAlign:'center'}}>
                <h2 style={{fontWeight: 700}}>{selectedSurah.name}</h2>
                <p style={{fontSize:12, opacity:.7}}>
                  {selectedSurah.englishName} - {selectedSurah.numberOfAyahs} verses
                </p>
              </div>
              <div style={{width: 96}} />
            </div>

            {selectedSurah.number !== 9 && (
              <div style={{textAlign:'center', marginBottom: 16, padding: 8, background:'#f3f4f6', borderRadius:8}}>
                <p style={{fontSize: 20}}>
                  بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                </p>
              </div>
            )}

            <ScrollArea style={{maxHeight: '60vh'}}>
              <div>
                {selectedSurah.ayahs.map((verse) => (
                  <div key={verse.number} style={{padding: 12, background:'#f9fafb', borderRadius:8, marginBottom: 8, borderRight: '4px solid #16a34a'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 8}}>
                      <div style={{background:'#16a34a', color:'#fff', borderRadius:9999, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12}}>
                        {verse.numberInSurah}
                      </div>
                    </div>
                    <p style={{fontSize:18, lineHeight: 2, textAlign:'right'}}>
                      {verse.text}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>
      )}
    </div>
  );
};

export default QuranWeb;

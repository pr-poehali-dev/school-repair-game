import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface School {
  id: number
  name: string
  district: string
  renovationProgress: number
  budget: number
  status: 'planning' | 'in_progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  workers: number
  materials: number
  issues: string[]
}

interface GameState {
  totalBudget: number
  availableWorkers: number
  reputation: number
  completedProjects: number
}

function Index() {
  const [gameState, setGameState] = useState<GameState>({
    totalBudget: 500000000,
    availableWorkers: 150,
    reputation: 75,
    completedProjects: 12
  })

  const [schools, setSchools] = useState<School[]>([
    {
      id: 1,
      name: 'Школа №1337',
      district: 'Центральный',
      renovationProgress: 75,
      budget: 45000000,
      status: 'in_progress',
      priority: 'high',
      workers: 25,
      materials: 80,
      issues: ['Задержка поставки окон']
    },
    {
      id: 2,
      name: 'Гимназия №42',
      district: 'Северный',
      renovationProgress: 30,
      budget: 38000000,
      status: 'in_progress',
      priority: 'medium',
      workers: 15,
      materials: 60,
      issues: ['Нужны дополнительные электрики']
    },
    {
      id: 3,
      name: 'Лицей "Будущее"',
      district: 'Восточный',
      renovationProgress: 0,
      budget: 52000000,
      status: 'planning',
      priority: 'high',
      workers: 0,
      materials: 0,
      issues: ['Ожидание разрешений']
    },
    {
      id: 4,
      name: 'Школа №888',
      district: 'Западный',
      renovationProgress: 100,
      budget: 41000000,
      status: 'completed',
      priority: 'low',
      workers: 0,
      materials: 100,
      issues: []
    }
  ])

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-game-yellow text-black'
      case 'in_progress': return 'bg-game-blue text-white'
      case 'completed': return 'bg-game-green text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-game-red text-white'
      case 'medium': return 'bg-game-orange text-white'
      case 'low': return 'bg-game-cyan text-black'
      default: return 'bg-gray-500 text-white'
    }
  }

  const assignWorkers = (schoolId: number, count: number) => {
    if (gameState.availableWorkers >= count) {
      setSchools(schools.map(school => 
        school.id === schoolId 
          ? { ...school, workers: school.workers + count }
          : school
      ))
      setGameState(prev => ({ 
        ...prev, 
        availableWorkers: prev.availableWorkers - count 
      }))
    }
  }

  const startRenovation = (schoolId: number) => {
    setSchools(schools.map(school => 
      school.id === schoolId 
        ? { ...school, status: 'in_progress' as const, renovationProgress: 5 }
        : school
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-cyan/20 to-game-blue/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏗️ Капремонт школ Москвы
          </h1>
          <p className="text-gray-600 text-lg">
            Управляй проектами реновации в рамках программы "Моя школа"
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Icon name="DollarSign" size={16} />
                Бюджет
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-game-blue">
                {(gameState.totalBudget / 1000000).toFixed(0)}М ₽
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Icon name="Users" size={16} />
                Рабочие
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-game-orange">
                {gameState.availableWorkers}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Icon name="Star" size={16} />
                Репутация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-game-purple">
                {gameState.reputation}%
              </div>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-transform">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                Завершено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-game-green">
                {gameState.completedProjects}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {schools.map((school) => (
            <Card 
              key={school.id} 
              className="hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedSchool(school)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{school.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(school.status)}>
                      {school.status === 'planning' && 'Планирование'}
                      {school.status === 'in_progress' && 'В работе'}
                      {school.status === 'completed' && 'Завершено'}
                    </Badge>
                    <Badge className={getPriorityColor(school.priority)}>
                      {school.priority === 'high' && 'Высокий'}
                      {school.priority === 'medium' && 'Средний'}
                      {school.priority === 'low' && 'Низкий'}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {school.district} район
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Прогресс ремонта</span>
                      <span className="font-medium">{school.renovationProgress}%</span>
                    </div>
                    <Progress value={school.renovationProgress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Бюджет:</span>
                      <div className="font-medium text-game-blue">
                        {(school.budget / 1000000).toFixed(0)}М ₽
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Рабочие:</span>
                      <div className="font-medium text-game-orange">
                        {school.workers} чел.
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-600">Материалы:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={school.materials} className="h-1.5" />
                      <span className="font-medium text-xs">{school.materials}%</span>
                    </div>
                  </div>

                  {school.issues.length > 0 && (
                    <div className="text-sm">
                      <span className="text-red-600 font-medium flex items-center gap-1">
                        <Icon name="AlertTriangle" size={14} />
                        Проблемы:
                      </span>
                      <ul className="text-xs text-red-500 mt-1">
                        {school.issues.map((issue, index) => (
                          <li key={index}>• {issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {school.status === 'planning' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-game-blue hover:bg-game-blue/90"
                        onClick={(e) => {
                          e.stopPropagation()
                          startRenovation(school.id)
                        }}
                      >
                        <Icon name="Play" size={14} className="mr-1" />
                        Начать
                      </Button>
                    )}
                    {school.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          assignWorkers(school.id, 5)
                        }}
                        disabled={gameState.availableWorkers < 5}
                      >
                        <Icon name="UserPlus" size={14} className="mr-1" />
                        +5 рабочих
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedSchool(school)
                      }}
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected School Details Modal */}
        {selectedSchool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedSchool.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{selectedSchool.district} район</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedSchool(null)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-game-blue/10 rounded-lg">
                      <div className="text-2xl font-bold text-game-blue">
                        {selectedSchool.renovationProgress}%
                      </div>
                      <div className="text-sm text-gray-600">Прогресс</div>
                    </div>
                    <div className="text-center p-4 bg-game-orange/10 rounded-lg">
                      <div className="text-2xl font-bold text-game-orange">
                        {selectedSchool.workers}
                      </div>
                      <div className="text-sm text-gray-600">Рабочих</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Этапы ремонта</h3>
                    <div className="space-y-2">
                      {[
                        { name: 'Демонтаж', progress: Math.min(selectedSchool.renovationProgress, 20) * 5 },
                        { name: 'Электрика', progress: Math.max(0, Math.min(selectedSchool.renovationProgress - 20, 25)) * 4 },
                        { name: 'Сантехника', progress: Math.max(0, Math.min(selectedSchool.renovationProgress - 45, 20)) * 5 },
                        { name: 'Отделка', progress: Math.max(0, Math.min(selectedSchool.renovationProgress - 65, 25)) * 4 },
                        { name: 'Финальные работы', progress: Math.max(0, selectedSchool.renovationProgress - 90) * 10 }
                      ].map((stage, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{stage.name}</span>
                            <span>{Math.round(stage.progress)}%</span>
                          </div>
                          <Progress value={stage.progress} className="h-1.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedSchool.issues.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
                        <Icon name="AlertTriangle" size={16} />
                        Текущие проблемы
                      </h3>
                      <div className="space-y-2">
                        {selectedSchool.issues.map((issue, index) => (
                          <div key={index} className="p-3 bg-red-50 border-l-4 border-red-400 text-sm">
                            {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedSchool.status === 'in_progress' && (
                      <>
                        <Button 
                          className="flex-1 bg-game-blue hover:bg-game-blue/90"
                          onClick={() => assignWorkers(selectedSchool.id, 10)}
                          disabled={gameState.availableWorkers < 10}
                        >
                          <Icon name="UserPlus" size={16} className="mr-2" />
                          Добавить 10 рабочих
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                        >
                          <Icon name="Truck" size={16} className="mr-2" />
                          Заказать материалы
                        </Button>
                      </>
                    )}
                    {selectedSchool.status === 'planning' && (
                      <Button 
                        className="w-full bg-game-green hover:bg-game-green/90"
                        onClick={() => {
                          startRenovation(selectedSchool.id)
                          setSelectedSchool(null)
                        }}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать ремонт
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
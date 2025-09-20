import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Icon from '@/components/ui/icon'

interface School {
  id: number
  name: string
  address: string
  district: string
  students: number
  renovationProgress: number
  budget: number
  spent: number
  status: 'design' | 'tender' | 'construction' | 'completed' | 'problems'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  workers: number
  contractor: string
  startDate: string
  endDate: string
  issues: Issue[]
  stages: Stage[]
  reports: Report[]
}

interface Issue {
  id: number
  type: 'delay' | 'budget' | 'quality' | 'safety' | 'permits'
  description: string
  severity: 'low' | 'medium' | 'high'
  date: string
  resolved: boolean
}

interface Stage {
  name: string
  progress: number
  startDate: string
  endDate: string
  responsible: string
  cost: number
}

interface Report {
  date: string
  type: 'progress' | 'problem' | 'completion'
  message: string
}

interface GameEvent {
  id: number
  type: 'budget_cut' | 'weather_delay' | 'contractor_problem' | 'inspection' | 'media_attention'
  title: string
  description: string
  impact: string
  choices: EventChoice[]
}

interface EventChoice {
  text: string
  cost: number
  timeDelay: number
  reputationChange: number
}

interface GameState {
  totalBudget: number
  spentBudget: number
  availableWorkers: number
  reputation: number
  completedProjects: number
  currentMonth: number
  currentYear: number
  weatherCondition: 'good' | 'rain' | 'cold' | 'snow'
  publicSatisfaction: number
}

function Index() {
  const [gameState, setGameState] = useState<GameState>({
    totalBudget: 15000000000,
    spentBudget: 3200000000,
    availableWorkers: 2340,
    reputation: 78,
    completedProjects: 23,
    currentMonth: 9,
    currentYear: 2024,
    weatherCondition: 'good',
    publicSatisfaction: 82
  })

  const [schools, setSchools] = useState<School[]>([
    {
      id: 1,
      name: 'ГБОУ Школа №1357 "На Братиславской"',
      address: 'ул. Братиславская, д. 26',
      district: 'Марьино',
      students: 1247,
      renovationProgress: 67,
      budget: 185000000,
      spent: 124000000,
      status: 'construction',
      priority: 'high',
      workers: 45,
      contractor: 'ООО "СтройТехМонтаж"',
      startDate: '2024-03-15',
      endDate: '2024-12-20',
      issues: [
        {
          id: 1,
          type: 'delay',
          description: 'Задержка поставки оконных блоков на 2 недели',
          severity: 'medium',
          date: '2024-09-10',
          resolved: false
        }
      ],
      stages: [
        { name: 'Проектирование', progress: 100, startDate: '2024-01-10', endDate: '2024-03-01', responsible: 'ГлавАПУ', cost: 8500000 },
        { name: 'Демонтажные работы', progress: 100, startDate: '2024-03-15', endDate: '2024-04-30', responsible: 'СтройТехМонтаж', cost: 15000000 },
        { name: 'Инженерные системы', progress: 85, startDate: '2024-04-01', endDate: '2024-07-15', responsible: 'ТехСистемы', cost: 65000000 },
        { name: 'Отделочные работы', progress: 45, startDate: '2024-06-01', endDate: '2024-11-30', responsible: 'Интерьер+', cost: 78000000 },
        { name: 'Благоустройство', progress: 0, startDate: '2024-11-01', endDate: '2024-12-20', responsible: 'ЛандшафтСтрой', cost: 18500000 }
      ],
      reports: [
        { date: '2024-09-15', type: 'progress', message: 'Завершены работы по электромонтажу в блоке начальной школы' },
        { date: '2024-09-10', type: 'problem', message: 'Выявлено нарушение графика поставки окон' }
      ]
    },
    {
      id: 2,
      name: 'ГБОУ Школа №2086',
      address: 'ул. Университетский проспект, д. 5',
      district: 'Раменки',
      students: 986,
      renovationProgress: 23,
      budget: 156000000,
      spent: 36000000,
      status: 'construction',
      priority: 'medium',
      workers: 28,
      contractor: 'АО "МосСтройПроект"',
      startDate: '2024-07-01',
      endDate: '2025-05-30',
      issues: [
        {
          id: 2,
          type: 'budget',
          description: 'Превышение сметы на инженерные системы на 15%',
          severity: 'high',
          date: '2024-09-08',
          resolved: false
        }
      ],
      stages: [
        { name: 'Проектирование', progress: 100, startDate: '2024-04-01', endDate: '2024-06-15', responsible: 'МосПроект', cost: 7200000 },
        { name: 'Демонтажные работы', progress: 80, startDate: '2024-07-01', endDate: '2024-08-30', responsible: 'МосСтройПроект', cost: 12000000 },
        { name: 'Инженерные системы', progress: 15, startDate: '2024-08-15', endDate: '2024-12-30', responsible: 'ИнжСтрой', cost: 58000000 },
        { name: 'Отделочные работы', progress: 0, startDate: '2024-12-01', endDate: '2025-04-15', responsible: 'ДизайнСтрой', cost: 65000000 },
        { name: 'Благоустройство', progress: 0, startDate: '2025-04-01', endDate: '2025-05-30', responsible: 'ЭкоСтрой', cost: 13800000 }
      ],
      reports: [
        { date: '2024-09-12', type: 'progress', message: 'Начаты работы по прокладке новых коммуникаций' },
        { date: '2024-09-08', type: 'problem', message: 'Обнаружены дополнительные работы по усилению фундамента' }
      ]
    },
    {
      id: 3,
      name: 'ГБОУ "Школа будущего"',
      address: 'ул. Нагатинская набережная, д. 54',
      district: 'Нагатино-Садовники',
      students: 1456,
      renovationProgress: 0,
      budget: 234000000,
      spent: 0,
      status: 'tender',
      priority: 'urgent',
      workers: 0,
      contractor: 'Идет отбор подрядчика',
      startDate: '2024-11-01',
      endDate: '2025-08-31',
      issues: [
        {
          id: 3,
          type: 'permits',
          description: 'Задержка получения разрешения Мосгорнаследия',
          severity: 'high',
          date: '2024-09-05',
          resolved: false
        }
      ],
      stages: [
        { name: 'Проектирование', progress: 95, startDate: '2024-02-01', endDate: '2024-09-30', responsible: 'АрхПроект', cost: 12000000 },
        { name: 'Демонтажные работы', progress: 0, startDate: '2024-11-01', endDate: '2024-12-30', responsible: 'TBD', cost: 18000000 },
        { name: 'Инженерные системы', progress: 0, startDate: '2025-01-15', endDate: '2025-05-30', responsible: 'TBD', cost: 89000000 },
        { name: 'Отделочные работы', progress: 0, startDate: '2025-04-01', endDate: '2025-07-31', responsible: 'TBD', cost: 95000000 },
        { name: 'Благоустройство', progress: 0, startDate: '2025-07-01', endDate: '2025-08-31', responsible: 'TBD', cost: 20000000 }
      ],
      reports: [
        { date: '2024-09-05', type: 'problem', message: 'Требуется дополнительное согласование с Мосгорнаследием' }
      ]
    }
  ])

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null)
  const [notifications, setNotifications] = useState<string[]>([
    'Получено финансирование на новый проект школы в Бутово',
    'Завершена проверка качества работ в школе №1357'
  ])

  const gameEvents: GameEvent[] = [
    {
      id: 1,
      type: 'weather_delay',
      title: 'Неблагоприятные погодные условия',
      description: 'Затяжные дожди могут задержать наружные работы на 1-2 недели',
      impact: 'Возможная задержка сроков строительства',
      choices: [
        { text: 'Продолжить работы под тентами (+500К ₽)', cost: 500000, timeDelay: 0, reputationChange: 2 },
        { text: 'Приостановить наружные работы', cost: 0, timeDelay: 14, reputationChange: -1 },
        { text: 'Перенести рабочих на внутренние работы', cost: 200000, timeDelay: 7, reputationChange: 1 }
      ]
    },
    {
      id: 2,
      type: 'budget_cut',
      title: 'Корректировка бюджета',
      description: 'Департамент образования сократил финансирование на 8%',
      impact: 'Необходимо пересмотреть планы или найти дополнительные источники',
      choices: [
        { text: 'Сократить объем работ', cost: 0, timeDelay: 0, reputationChange: -5 },
        { text: 'Найти спонсоров', cost: 1000000, timeDelay: 30, reputationChange: 3 },
        { text: 'Использовать резервный фонд', cost: 5000000, timeDelay: 0, reputationChange: 0 }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const event = gameEvents[Math.floor(Math.random() * gameEvents.length)]
        setCurrentEvent(event)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'design': return 'bg-mos-purple text-white'
      case 'tender': return 'bg-mos-orange text-white'
      case 'construction': return 'bg-mos-blue text-white'
      case 'completed': return 'bg-mos-green text-white'
      case 'problems': return 'bg-mos-red text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'design': return 'Проектирование'
      case 'tender': return 'Торги'
      case 'construction': return 'Строительство'
      case 'completed': return 'Завершено'
      case 'problems': return 'Проблемы'
      default: return 'Неизвестно'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-black'
      case 'low': return 'bg-green-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const handleEventChoice = (choice: EventChoice) => {
    setGameState(prev => ({
      ...prev,
      spentBudget: prev.spentBudget + choice.cost,
      reputation: prev.reputation + choice.reputationChange
    }))
    
    setNotifications(prev => [...prev, `Решение принято: ${choice.text}`])
    setCurrentEvent(null)
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
      setNotifications(prev => [...prev, `Назначено ${count} рабочих на объект ${schools.find(s => s.id === schoolId)?.name}`])
    }
  }

  const accelerateProject = (schoolId: number) => {
    const school = schools.find(s => s.id === schoolId)
    if (school && gameState.spentBudget + 5000000 <= gameState.totalBudget) {
      setSchools(schools.map(s => 
        s.id === schoolId 
          ? { ...s, renovationProgress: Math.min(s.renovationProgress + 10, 100) }
          : s
      ))
      setGameState(prev => ({ 
        ...prev, 
        spentBudget: prev.spentBudget + 5000000 
      }))
      setNotifications(prev => [...prev, `Ускорение работ в ${school.name} (+10%)`])
    }
  }

  return (
    <div className="min-h-screen bg-mos-gray">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-mos-blue rounded-lg flex items-center justify-center">
                <Icon name="Building" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-mos-darkGray">Капремонт школ Москвы</h1>
                <p className="text-sm text-gray-600">Система управления программой "Моя школа"</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {gameState.currentMonth}/2024 • Репутация: {gameState.reputation}%
              </span>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-6">
            {notifications.slice(-2).map((notification, index) => (
              <Alert key={index} className="mb-2 border-mos-blue bg-mos-lightBlue">
                <Icon name="Info" size={16} />
                <AlertDescription>{notification}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Event Modal */}
        {currentEvent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-mos-orange" />
                  {currentEvent.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{currentEvent.description}</p>
                  <div className="p-3 bg-mos-lightBlue rounded-lg">
                    <p className="text-sm font-medium text-mos-darkBlue">{currentEvent.impact}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Выберите решение:</p>
                    {currentEvent.choices.map((choice, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-left h-auto p-4"
                        onClick={() => handleEventChoice(choice)}
                      >
                        <div>
                          <div className="font-medium">{choice.text}</div>
                          <div className="text-sm text-gray-600">
                            Стоимость: {choice.cost.toLocaleString()} ₽ | 
                            Задержка: {choice.timeDelay} дней | 
                            Репутация: {choice.reputationChange > 0 ? '+' : ''}{choice.reputationChange}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Общий бюджет</p>
                  <p className="text-2xl font-bold text-mos-blue">
                    {(gameState.totalBudget / 1000000000).toFixed(1)}B ₽
                  </p>
                </div>
                <Icon name="DollarSign" size={24} className="text-mos-blue" />
              </div>
              <div className="mt-2">
                <Progress value={(gameState.spentBudget / gameState.totalBudget) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  Потрачено: {(gameState.spentBudget / 1000000000).toFixed(1)}B ₽
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Рабочие</p>
                  <p className="text-2xl font-bold text-mos-green">{gameState.availableWorkers}</p>
                </div>
                <Icon name="Users" size={24} className="text-mos-green" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Доступно для назначения</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Завершено проектов</p>
                  <p className="text-2xl font-bold text-mos-purple">{gameState.completedProjects}</p>
                </div>
                <Icon name="CheckCircle" size={24} className="text-mos-purple" />
              </div>
              <p className="text-xs text-gray-500 mt-2">В этом году</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Удовлетворенность</p>
                  <p className="text-2xl font-bold text-mos-orange">{gameState.publicSatisfaction}%</p>
                </div>
                <Icon name="Star" size={24} className="text-mos-orange" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Общественное мнение</p>
            </CardContent>
          </Card>
        </div>

        {/* Schools List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="School" size={20} />
              Активные проекты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.map((school) => (
                <Card 
                  key={school.id}
                  className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedSchool(school)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-mos-darkGray">{school.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <Icon name="MapPin" size={14} />
                          {school.address}, {school.district}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Учащихся: {school.students} • Подрядчик: {school.contractor}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(school.status)}>
                          {getStatusText(school.status)}
                        </Badge>
                        <Badge className={getPriorityColor(school.priority)}>
                          {school.priority === 'urgent' && 'Срочно'}
                          {school.priority === 'high' && 'Высокий'}
                          {school.priority === 'medium' && 'Средний'}
                          {school.priority === 'low' && 'Низкий'}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Прогресс</span>
                          <span className="font-medium">{school.renovationProgress}%</span>
                        </div>
                        <Progress value={school.renovationProgress} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Бюджет</span>
                          <span className="font-medium">
                            {(school.spent / 1000000).toFixed(0)}М / {(school.budget / 1000000).toFixed(0)}М ₽
                          </span>
                        </div>
                        <Progress value={(school.spent / school.budget) * 100} className="h-2" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Рабочих на объекте</p>
                        <p className="text-xl font-bold text-mos-blue">{school.workers}</p>
                      </div>
                    </div>

                    {school.issues.filter(issue => !issue.resolved).length > 0 && (
                      <Alert className="mb-4 border-red-200 bg-red-50">
                        <Icon name="AlertTriangle" size={16} />
                        <AlertDescription>
                          Активных проблем: {school.issues.filter(issue => !issue.resolved).length}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          assignWorkers(school.id, 10)
                        }}
                        disabled={gameState.availableWorkers < 10}
                      >
                        <Icon name="UserPlus" size={14} className="mr-1" />
                        +10 рабочих
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          accelerateProject(school.id)
                        }}
                        disabled={gameState.spentBudget + 5000000 > gameState.totalBudget}
                      >
                        <Icon name="Zap" size={14} className="mr-1" />
                        Ускорить (+5М)
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-mos-blue hover:bg-mos-darkBlue"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSchool(school)
                        }}
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* School Details Modal */}
        {selectedSchool && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedSchool.name}</CardTitle>
                    <p className="text-gray-600 mt-1">{selectedSchool.address}</p>
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
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="stages">Этапы</TabsTrigger>
                    <TabsTrigger value="issues">Проблемы</TabsTrigger>
                    <TabsTrigger value="reports">Отчеты</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-mos-blue">{selectedSchool.renovationProgress}%</div>
                          <div className="text-sm text-gray-600">Общий прогресс</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-mos-green">{selectedSchool.workers}</div>
                          <div className="text-sm text-gray-600">Рабочих</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Финансирование</h3>
                      <Progress value={(selectedSchool.spent / selectedSchool.budget) * 100} className="h-3" />
                      <div className="flex justify-between text-sm mt-1">
                        <span>Потрачено: {(selectedSchool.spent / 1000000).toFixed(1)}М ₽</span>
                        <span>Бюджет: {(selectedSchool.budget / 1000000).toFixed(1)}М ₽</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="stages" className="space-y-4">
                    {selectedSchool.stages.map((stage, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{stage.name}</h4>
                            <Badge variant="outline">{stage.responsible}</Badge>
                          </div>
                          <Progress value={stage.progress} className="h-2 mb-2" />
                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>Начало: {stage.startDate}</div>
                            <div>Окончание: {stage.endDate}</div>
                            <div>Стоимость: {(stage.cost / 1000000).toFixed(1)}М ₽</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="issues" className="space-y-4">
                    {selectedSchool.issues.map((issue) => (
                      <Alert key={issue.id} className={issue.severity === 'high' ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'}>
                        <Icon name="AlertTriangle" size={16} />
                        <AlertDescription>
                          <div className="font-medium">{issue.description}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {issue.date} • {issue.type} • {issue.severity}
                            {issue.resolved && ' • Решено'}
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </TabsContent>

                  <TabsContent value="reports" className="space-y-4">
                    {selectedSchool.reports.map((report, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{report.message}</p>
                              <p className="text-sm text-gray-600">{report.date}</p>
                            </div>
                            <Badge variant="outline">{report.type}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
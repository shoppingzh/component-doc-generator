import Generator from '@/components/Generator'
import Viewer from '@/components/Viewer'

export default function(app) {
  app.use(Generator)
  app.use(Viewer)
}

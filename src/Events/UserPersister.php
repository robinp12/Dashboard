<?php 

namespace App\Events;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserPersister implements DataPersisterInterface
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function supports($data): bool
    {
        return $data instanceof User;
    }
    public function persist($data)
    {
        if($data->getRoles() != ["ADMIN"]){
            $role = ["USER"];
            $data->setRoles($role);
        }

        $this->em->persist($data);
        $this->em->flush();
      
    }
    public function remove($data)
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
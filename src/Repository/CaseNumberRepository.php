<?php

namespace App\Repository;

use App\Entity\CaseNumber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CaseNumber|null find($id, $lockMode = null, $lockVersion = null)
 * @method CaseNumber|null findOneBy(array $criteria, array $orderBy = null)
 * @method CaseNumber[]    findAll()
 * @method CaseNumber[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CaseNumberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CaseNumber::class);
    }

    // /**
    //  * @return CaseNumber[] Returns an array of CaseNumber objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CaseNumber
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
